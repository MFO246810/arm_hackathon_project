from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Float, Integer, DateTime, Boolean, BigInteger, Text

class Base(DeclarativeBase):
    pass

class Query_Data(Base):
    __tablename__ = "Query_Data"

    ID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    Model_Name: Mapped[str] = mapped_column(String(255), nullable=False)
    User_Query: Mapped[str] = mapped_column(Text, nullable=False)

    Query_Time: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    Response_Time: Mapped[DateTime] = mapped_column(DateTime, nullable=False)

    TTFT: Mapped[float] = mapped_column(Float, nullable=False)
    Total_Time: Mapped[float] = mapped_column(Float, nullable=False)

    Tokens_Per_Second: Mapped[float | None] = mapped_column(Float, nullable=True)

    CPU_Usage: Mapped[float] = mapped_column(Float, nullable=False)
    CPU_Peak: Mapped[float] = mapped_column(Float, nullable=False)

    RAM_Peak: Mapped[float] = mapped_column(Float, nullable=False)

    Disk_Read: Mapped[int | None] = mapped_column(BigInteger, nullable=True)
    Disk_Write: Mapped[int | None] = mapped_column(BigInteger, nullable=True)

    Success: Mapped[bool] = mapped_column(Boolean, default=True)
    Error_Message: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<ModelData ID={self.ID} Model={self.Model_Name} Total={self.Total_Time}s>"
