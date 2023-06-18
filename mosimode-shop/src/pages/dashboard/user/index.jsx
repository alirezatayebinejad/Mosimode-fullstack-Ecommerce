import React from "react";
import { getSession } from "next-auth/react";

const userDashboard = () => {
	return <div>userDashboard</div>;
};

export default userDashboard;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	} else if (session.user.username === process.env.ADMIN_USERNAME) {
		return {
			redirect: {
				destination: "/dashboard/admin",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}
