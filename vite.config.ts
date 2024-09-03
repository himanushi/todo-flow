import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		minify: true,
		lib: {
			entry: "src/main.tsx",
			name: "todo",
			formats: ["es"],
		},
		rollupOptions: {
			output: {
				globals: {
					react: "React",
				},
				preserveModules: true,
				inlineDynamicImports: false,
				entryFileNames: ({ name: fileName }) => `${fileName}.js`,
			},
			treeshake: {
				preset: "smallest",
				annotations: true,
				moduleSideEffects: true,
				correctVarValueBeforeDeclaration: true,
				propertyReadSideEffects: true,
				tryCatchDeoptimization: true,
				unknownGlobalSideEffects: true,
			},
		},
	},
});
