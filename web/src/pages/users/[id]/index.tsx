import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserQuery } from "../../../generated/graphql";

const UserPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useUserQuery({
    ssr: true,
    variables: { id: `${id}` },
  });
  const { user } = data || {};
  const { cars } = user || {};
  console.log(data);

  return (
    <div>
      <Link href="/">
        <a>🏠 Home</a>
      </Link>
      <h1>{loading ? "Loading" : user?.username}</h1>
      {cars?.map((car) => (
        <h2 key={car.id}>
          <Link href={`/cars/${car.id}`}>
            <a>{car.model}</a>
          </Link>
        </h2>
      ))}
    </div>
  );
};

export default UserPage;
