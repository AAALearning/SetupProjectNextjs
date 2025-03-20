"use client";

const DetailContent = () => {
  return (
    <>
      <div>
        <details>
          <summary>Click to view details</summary>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, optio. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consectetur fugit magni nulla deleniti hic omnis reiciendis officiis dolore earum neque
            architecto rerum quia quis est ratione aperiam asperiores quisquam voluptatum maiores, voluptatibus
            assumenda. Fugiat perspiciatis rem animi iusto, iste quisquam laboriosam voluptatibus at quaerat aliquam
            enim aut non numquam repellendus. Quasi eos quos voluptatem cum! Dolore aliquid, minima ab molestiae
            consequuntur saepe quos unde deleniti, odit ratione repellendus excepturi ipsum sit? Quis possimus maxime
            alias magnam. Aut maiores facilis dolores quasi magni non officiis, molestias inventore fugit corporis,
            itaque repellat cumque repudiandae ducimus, excepturi dolorum reiciendis temporibus illo officia? Dolor
            eaque voluptatibus porro amet ducimus officiis incidunt repellendus molestiae placeat sunt assumenda
            excepturi aliquid minus ad sed, laboriosam eius, nam accusamus tempore culpa omnis. Tempore quam laboriosam,
            similique consequuntur laudantium soluta commodi repellendus consectetur minus necessitatibus ab nemo
            ratione unde neque illo placeat nostrum aspernatur obcaecati? Praesentium, rem ea eos autem assumenda dicta
            inventore a vitae repellat enim sunt illum aspernatur iure, consequatur vero tempore necessitatibus nobis.
            Fugit, commodi maiores beatae illum animi nulla! Tenetur rem voluptatibus tempore perferendis porro maxime
            accusantium voluptate similique nesciunt labore nulla earum optio vero laborum, modi consequatur nam est
            natus. Quas explicabo quaerat, saepe fugit quod maxime optio nihil soluta praesentium vitae maiores laborum
            sapiente incidunt id provident aspernatur ducimus cupiditate expedita. Recusandae totam et aspernatur minus
            nostrum labore iusto, perferendis mollitia ipsa repellat fuga porro, sed est voluptatem voluptatibus?
          </p>
        </details>
      </div>
      <style jsx>{`
        details::details-content {
          overflow: hidden;
          block-size: 0;
          transition:
            block-size 1s allow-discrete,
            content-visibility 1s allow-discrete;
        }
        details[open]::details-content {
          block-size: auto;
        }
      `}</style>
    </>
  );
};

export default DetailContent;
