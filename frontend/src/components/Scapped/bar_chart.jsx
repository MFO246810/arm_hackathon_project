import { useEffect, useRef } from "preact/hooks";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

function barSeries(size = 0.6) {
  return (u, sidx, i0, i1) => {
    const ctx = u.ctx;
    const width = u.bbox.width;
    const scale = sidx === 1 ? u.series[sidx].scale : u.series[1].scale;

    const xScale = u.scales.x;
    const yScale = u.scales[scale];

    ctx.save();

    const barWidth = (width / (i1 - i0)) * size;

    for (let i = i0; i < i1; i++) {
      const x = u.valToPos(u.data[0][i], "x", true);
      const y = u.valToPos(u.data[sidx][i], scale, true);

      const zeroY = u.valToPos(0, scale, true);
      const barHeight = zeroY - y;

      ctx.fillStyle = u.series[sidx].fill || "blue";
      ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);
    }

    ctx.restore();
  };
}

export function ModelBarChart({ labels, values, title = "Model Comparison" }) {
  const chartRef = useRef(null);
  const uplotRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (uplotRef.current) {
      uplotRef.current.setData([labels.map((_, i) => i), values]);
      return;
    }

    const opts = {
      title,
      width: 600,
      height: 300,
      scales: {
        x: { time: false },
      },
      axes: [
        {
          values: (_, ticks) => ticks.map(i => labels[i] ?? ""),
        },
        {
          values: (_, ticks) => ticks.map(v => v.toFixed(0)),
        },
      ],
      series: [
        {},
        {
          label: "Value",
          fill: "#f30707ff",
          paths: barSeries(0.6), 
        },
      ],
    };

    uplotRef.current = new uPlot(
      opts,
      [labels.map((_, i) => i), values],
      chartRef.current
    );

    return () => {
      if (uplotRef.current) {
        uplotRef.current.destroy();
        uplotRef.current = null;
      }
    };
  }, [labels, values]);

  return <div ref={chartRef} />;
}
