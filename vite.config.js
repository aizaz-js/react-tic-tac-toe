import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
homepage: "/react-tic-tac-toe";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
});
