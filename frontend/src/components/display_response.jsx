import { useState } from 'preact/hooks';
import ReactMarkdown from "react-markdown";
import "./display_response.css"

export default function Display_response({prop}){

    return (
        <>
            <div class="Response_Container">
                <div class="Response_Title">
                    <h3> Model Query</h3>
                    <p> <strong> User Query: </strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod in dolores odit doloribus rerum impedit et vel voluptatum ea iusto nisi voluptates quisquam cum saepe, dolore nam, error non aperiam?</p>
                    <div class="Response_Body">
                        <ReactMarkdown> 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quo exercitationem sed accusamus aliquam, officiis accusantium corrupti quaerat? Eveniet, delectus nobis neque tempora corrupti eos fuga recusandae quasi explicabo? Dicta.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quisquam debitis, itaque dolorem quo earum quibusdam! Saepe, unde at! Dolorum illo consequatur neque. Nobis beatae nesciunt tenetur praesentium assumenda deserunt.
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio saepe, corrupti aliquid vitae, nesciunt non, recusandae rem hic deserunt unde nam? Quibusdam quae, pariatur saepe nihil earum modi accusantium quidem.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cum sit nisi, dolor eligendi quod, neque officiis eum amet ea consequuntur ab cumque doloremque illo perferendis libero inventore fugiat accusamus?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quis voluptatem maiores? Perferendis excepturi iste adipisci, architecto deleniti rem quam illum quisquam, ducimus consequatur aspernatur eaque optio! Nisi, dolorum libero.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptatibus error quaerat dolorem recusandae pariatur nam officia aliquam ipsam rerum. In, ea? Impedit numquam voluptatem quis. Ad cum nostrum a!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum excepturi tempora, autem impedit quasi repellendus, maiores reiciendis architecto, ducimus nemo dolor dolore quis cumque id reprehenderit consectetur! Consectetur, consequuntur repellat.
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum architecto porro natus pariatur eaque minima soluta cupiditate molestias fugiat saepe tempore eius, accusantium aliquid, quasi neque autem delectus! Temporibus, eligendi.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore rerum commodi esse atque, error id nostrum, rem qui suscipit dolorem quidem repellendus sit vero voluptate sapiente. Recusandae quod nesciunt inventore!
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex dolores earum, reprehenderit fugit eveniet eligendi tempore doloribus repellendus enim eum saepe. Illo odio ad consequuntur quod praesentium reprehenderit possimus fugiat.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla reprehenderit eaque iusto, repellat dolor nostrum, ratione alias, corporis similique suscipit illum saepe excepturi voluptatum dolorem fuga magnam esse nisi totam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quo exercitationem sed accusamus aliquam, officiis accusantium corrupti quaerat? Eveniet, delectus nobis neque tempora corrupti eos fuga recusandae quasi explicabo? Dicta.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quisquam debitis, itaque dolorem quo earum quibusdam! Saepe, unde at! Dolorum illo consequatur neque. Nobis beatae nesciunt tenetur praesentium assumenda deserunt.
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio saepe, corrupti aliquid vitae, nesciunt non, recusandae rem hic deserunt unde nam? Quibusdam quae, pariatur saepe nihil earum modi accusantium quidem.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cum sit nisi, dolor eligendi quod, neque officiis eum amet ea consequuntur ab cumque doloremque illo perferendis libero inventore fugiat accusamus?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quis voluptatem maiores? Perferendis excepturi iste adipisci, architecto deleniti rem quam illum quisquam, ducimus consequatur aspernatur eaque optio! Nisi, dolorum libero.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptatibus error quaerat dolorem recusandae pariatur nam officia aliquam ipsam rerum. In, ea? Impedit numquam voluptatem quis. Ad cum nostrum a!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum excepturi tempora, autem impedit quasi repellendus, maiores reiciendis architecto, ducimus nemo dolor dolore quis cumque id reprehenderit consectetur! Consectetur, consequuntur repellat.
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum architecto porro natus pariatur eaque minima soluta cupiditate molestias fugiat saepe tempore eius, accusantium aliquid, quasi neque autem delectus! Temporibus, eligendi.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore rerum commodi esse atque, error id nostrum, rem qui suscipit dolorem quidem repellendus sit vero voluptate sapiente. Recusandae quod nesciunt inventore!
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex dolores earum, reprehenderit fugit eveniet eligendi tempore doloribus repellendus enim eum saepe. Illo odio ad consequuntur quod praesentium reprehenderit possimus fugiat.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla reprehenderit eaque iusto, repellat dolor nostrum, ratione alias, corporis similique suscipit illum saepe excepturi voluptatum dolorem fuga magnam esse nisi totam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quo exercitationem sed accusamus aliquam, officiis accusantium corrupti quaerat? Eveniet, delectus nobis neque tempora corrupti eos fuga recusandae quasi explicabo? Dicta.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quisquam debitis, itaque dolorem quo earum quibusdam! Saepe, unde at! Dolorum illo consequatur neque. Nobis beatae nesciunt tenetur praesentium assumenda deserunt.
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio saepe, corrupti aliquid vitae, nesciunt non, recusandae rem hic deserunt unde nam? Quibusdam quae, pariatur saepe nihil earum modi accusantium quidem.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cum sit nisi, dolor eligendi quod, neque officiis eum amet ea consequuntur ab cumque doloremque illo perferendis libero inventore fugiat accusamus?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quis voluptatem maiores? Perferendis excepturi iste adipisci, architecto deleniti rem quam illum quisquam, ducimus consequatur aspernatur eaque optio! Nisi, dolorum libero.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptatibus error quaerat dolorem recusandae pariatur nam officia aliquam ipsam rerum. In, ea? Impedit numquam voluptatem quis. Ad cum nostrum a!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum excepturi tempora, autem impedit quasi repellendus, maiores reiciendis architecto, ducimus nemo dolor dolore quis cumque id reprehenderit consectetur! Consectetur, consequuntur repellat.
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum architecto porro natus pariatur eaque minima soluta cupiditate molestias fugiat saepe tempore eius, accusantium aliquid, quasi neque autem delectus! Temporibus, eligendi.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore rerum commodi esse atque, error id nostrum, rem qui suscipit dolorem quidem repellendus sit vero voluptate sapiente. Recusandae quod nesciunt inventore!
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex dolores earum, reprehenderit fugit eveniet eligendi tempore doloribus repellendus enim eum saepe. Illo odio ad consequuntur quod praesentium reprehenderit possimus fugiat.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla reprehenderit eaque iusto, repellat dolor nostrum, ratione alias, corporis similique suscipit illum saepe excepturi voluptatum dolorem fuga magnam esse nisi totam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quo exercitationem sed accusamus aliquam, officiis accusantium corrupti quaerat? Eveniet, delectus nobis neque tempora corrupti eos fuga recusandae quasi explicabo? Dicta.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quisquam debitis, itaque dolorem quo earum quibusdam! Saepe, unde at! Dolorum illo consequatur neque. Nobis beatae nesciunt tenetur praesentium assumenda deserunt.
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio saepe, corrupti aliquid vitae, nesciunt non, recusandae rem hic deserunt unde nam? Quibusdam quae, pariatur saepe nihil earum modi accusantium quidem.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cum sit nisi, dolor eligendi quod, neque officiis eum amet ea consequuntur ab cumque doloremque illo perferendis libero inventore fugiat accusamus?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quis voluptatem maiores? Perferendis excepturi iste adipisci, architecto deleniti rem quam illum quisquam, ducimus consequatur aspernatur eaque optio! Nisi, dolorum libero.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptatibus error quaerat dolorem recusandae pariatur nam officia aliquam ipsam rerum. In, ea? Impedit numquam voluptatem quis. Ad cum nostrum a!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum excepturi tempora, autem impedit quasi repellendus, maiores reiciendis architecto, ducimus nemo dolor dolore quis cumque id reprehenderit consectetur! Consectetur, consequuntur repellat.
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum architecto porro natus pariatur eaque minima soluta cupiditate molestias fugiat saepe tempore eius, accusantium aliquid, quasi neque autem delectus! Temporibus, eligendi.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore rerum commodi esse atque, error id nostrum, rem qui suscipit dolorem quidem repellendus sit vero voluptate sapiente. Recusandae quod nesciunt inventore!
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex dolores earum, reprehenderit fugit eveniet eligendi tempore doloribus repellendus enim eum saepe. Illo odio ad consequuntur quod praesentium reprehenderit possimus fugiat.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla reprehenderit eaque iusto, repellat dolor nostrum, ratione alias, corporis similique suscipit illum saepe excepturi voluptatum dolorem fuga magnam esse nisi totam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quo exercitationem sed accusamus aliquam, officiis accusantium corrupti quaerat? Eveniet, delectus nobis neque tempora corrupti eos fuga recusandae quasi explicabo? Dicta.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quisquam debitis, itaque dolorem quo earum quibusdam! Saepe, unde at! Dolorum illo consequatur neque. Nobis beatae nesciunt tenetur praesentium assumenda deserunt.
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio saepe, corrupti aliquid vitae, nesciunt non, recusandae rem hic deserunt unde nam? Quibusdam quae, pariatur saepe nihil earum modi accusantium quidem.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cum sit nisi, dolor eligendi quod, neque officiis eum amet ea consequuntur ab cumque doloremque illo perferendis libero inventore fugiat accusamus?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quis voluptatem maiores? Perferendis excepturi iste adipisci, architecto deleniti rem quam illum quisquam, ducimus consequatur aspernatur eaque optio! Nisi, dolorum libero.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptatibus error quaerat dolorem recusandae pariatur nam officia aliquam ipsam rerum. In, ea? Impedit numquam voluptatem quis. Ad cum nostrum a!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum excepturi tempora, autem impedit quasi repellendus, maiores reiciendis architecto, ducimus nemo dolor dolore quis cumque id reprehenderit consectetur! Consectetur, consequuntur repellat.
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum architecto porro natus pariatur eaque minima soluta cupiditate molestias fugiat saepe tempore eius, accusantium aliquid, quasi neque autem delectus! Temporibus, eligendi.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore rerum commodi esse atque, error id nostrum, rem qui suscipit dolorem quidem repellendus sit vero voluptate sapiente. Recusandae quod nesciunt inventore!
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex dolores earum, reprehenderit fugit eveniet eligendi tempore doloribus repellendus enim eum saepe. Illo odio ad consequuntur quod praesentium reprehenderit possimus fugiat.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla reprehenderit eaque iusto, repellat dolor nostrum, ratione alias, corporis similique suscipit illum saepe excepturi voluptatum dolorem fuga magnam esse nisi totam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla reprehenderit eaque iusto, repellat dolor nostrum, ratione alias, corporis similique suscipit illum saepe excepturi voluptatum dolorem fuga magnam esse nisi totam.

                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </>
    )
}