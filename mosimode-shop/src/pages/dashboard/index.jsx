import React from "react";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const dashboardRoot = () => {
	const { t } = useTranslation("all");
	return <div>{t("dashboard Root")}</div>;
};

export default dashboardRoot;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const { locale } = context;
	if (!session) {
		return {
			redirect: {
				destination: `/${locale}/login`,
				permanent: false,
			},
			props: {
				...(await serverSideTranslations(locale, ["all"])),
			},
		};
	} else if (session.user.username === process.env.ADMIN_USERNAME) {
		return {
			redirect: {
				destination: `/${locale}/dashboard/admin`,
				locale: locale,
				permanent: false,
			},
			props: {
				...(await serverSideTranslations(locale, ["all"])),
			},
		};
	} else if (session.user.username !== process.env.ADMIN_USERNAME) {
		return {
			redirect: {
				destination: `/${locale}/dashboard/user`,
				permanent: false,
			},
			props: {
				...(await serverSideTranslations(locale, ["all"])),
			},
		};
	}
	return {
		redirect: {
			destination: `/${locale}/`,
			permanent: false,
		},
		props: {
			...(await serverSideTranslations(locale, ["all"])),
		},
	};
}
