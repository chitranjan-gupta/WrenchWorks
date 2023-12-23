import groq from "groq";
import { client } from "@/lib/sanity";

export default function Index({ authors }) {
  return (
    <div className="text-black">
      {authors.map((author) => (
        <div key={author._id}>{author.name}</div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const authors = await client.fetch(groq`*[_type == "author"]{
        _id,
      name,
      slug,
      image
    }`);
  return {
    props: {
      authors,
    },
  };
}
