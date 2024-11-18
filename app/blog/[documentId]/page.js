import axios from "axios";

const fetchBlog = async (documentId) => {
  try {
    const response = await axios.get(
      `${process.env.STRAIP_BASE_URL}/api/blogs/${documentId}?populate[0]=thumbnail`
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching blog:",
      error.response?.data || error.message
    );
    return null;
  }
};

export default async function Page({ params }) {
  const blog = await fetchBlog(params.documentId);

  if (!blog) {
    return <div>Error: Blog not found.</div>;
  }

  return (
    <div className="flex items-center space-x-6">
      {blog.thumbnail?.formats?.thumbnail?.url && (
        <img
          src={`${process.env.STRAIP_BASE_URL}${blog.thumbnail.formats.thumbnail.url}`}
          alt={blog.title}
          className="w-64 h-64 object-cover rounded-md"
        />
      )}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {blog.title}
        </h1>
        <p className="text-gray-600 text-xl pt-5">{blog.description}</p>
        {blog.detail?.map((item, index) =>
          item.children.map((child, childIndex) =>
            child.type === "text" ? (
              <p
                key={`${index}-${childIndex}`}
                className="text-gray-600 text-xl pt-5"
              >
                {child.text}
              </p>
            ) : null
          )
        )}
      </div>
    </div>
  );
}
