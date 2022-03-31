import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { CarDocument, CarQuery, useCarQuery } from "../../../generated/graphql";

const CarPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useCarQuery({
    ssr: true,
    variables: { id: `${id}` },
  });
  const { car } = data || {};
  const { user } = car || {};

  return (
    <div>
      <Link href="/">
        <a>🏠 Home</a>
      </Link>
      <h1>{loading ? "Loading" : car?.model}</h1>
      <h2>
        <Link href={`/users/${user?.id}`}>
          <a>{user?.username}</a>
        </Link>
      </h2>
    </div>
  );
};

export default CarPage;
