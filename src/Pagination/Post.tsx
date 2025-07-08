import ProductCard from "../Components/ProductCard";
import type { Product } from "../Hooks/ContextApi";


interface PostProps {
  allData?: Product[];
  menulist?: string;
}

const Post: React.FC<PostProps> = ({ allData = [], menulist = "" }) => {
  return (
    <div
      className={`${
        menulist === "activelist"
          ? ""
          : "flex flex-wrap justify-between pt-[60px]"
      }`}
    >
      {allData.map(item => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Post;
