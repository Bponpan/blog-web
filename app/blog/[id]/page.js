import axios from "axios";

const fetchBlog = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.STRAIP_BASE_URL}/api/blogs/${id}?populate[0]=thumbnail`,
    );
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Page({ params }) {
  const blog = await fetchBlog(params.id);
  console.log("blog", blog);
  return (
    <div>
      {/* <img
        src={`${process.env.STRAPI_BASE_URL}${blog.attributes.thumbnail.data.attributes.formats.thumbnail.url}`}
      />
      {blog.id}
      {blog.attributes.description} */}
      {blog.title}
    </div>
  );
}