import React from "react";
import { getSession } from "next-auth/react";

const dashboardRoot = () => {
	return <div>dashboard Root</div>;
};

export default dashboardRoot;

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
	} else if (session.user.username !== process.env.ADMIN_USERNAME) {
		return {
			redirect: {
				destination: "/dashboard/user",
				permanent: false,
			},
		};
	}
	return {
		redirect: {
			destination: "/",
			permanent: false,
		},
	};
}
