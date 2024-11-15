import axios from "axios";
import Link from "next/link";

const fetchBlogs = async () => {
  try {
    const response = await axios.get(
      `${process.env.STRAIP_BASE_URL}/api/blogs`
    );
    // console.log("data", response.data);
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Page() {
  const blog = await fetchBlogs();
  console.log("blog", blog);

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blog.map((blogItem, index) => (
          <div key={index} className="p-5">
            <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ">
              <h3 className="text-2xl font-bold text-purple-800">
                {blogItem.title}
              </h3>
              <p className="text-gray-600 mt-3 text-sm">
                {blogItem.description}
              </p>
              <Link
                href={`blog/${blogItem.id}`}
                className="inline-block bg-pink-500 text-white font-medium py-2 px-4 rounded-lg mt-4 text-center hover:bg-pink-600 transition-colors duration-300"
              >
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}