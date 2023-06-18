import React from "react";
import { getSession } from "next-auth/react";

const adminDashboard = () => {
	return <div>adminDashboard</div>;
};

export default adminDashboard;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	} else if (session.user.username !== process.env.ADMIN_USERNAME) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}
