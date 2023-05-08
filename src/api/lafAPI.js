import { Cloud } from "laf-client-sdk";

export const cloud = new Cloud({
	baseUrl: "https://jyf6wk.laf.dev",
	getAccessToken: () => localStorage.getItem("access_token"),
	timeout: 1000000,
});


