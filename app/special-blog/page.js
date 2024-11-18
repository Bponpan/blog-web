import { headers, cookies } from "next/headers";
import axios from "axios";

const fetchSpecialBlogs = async () => {
  try {
    const token = cookies().get("token");
    const response = await axios.get(
      `${process.env.STRAIP_BASE_URL}/api/special-blogs`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Page() {
  const headersList = headers();
  const user = JSON.parse(headersList.get("users"));
  const blogs = await fetchSpecialBlogs();
  //   console.log("blogs", blogs);
  // console.log(user);
  // console.log(headersList);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-6 bg-purple-100 border-l-4 ">
              <h3 className="text-2xl font-bold text-purple-800">
                {blog.title}
              </h3>
              <p className="text-gray-700 mt-2">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
