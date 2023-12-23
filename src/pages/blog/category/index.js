import groq from "groq";
import { client } from "@/lib/sanity";

export default function Index({ categories }) {
  return (
    <div className="text-black">
      {categories.map((category) => (
        <div key={category._id}>{category.title}</div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const categories = await client.fetch(groq`*[_type == "category"]{
        _id,
      title,
    }`);
  return {
    props: {
      categories,
    },
  };
}
