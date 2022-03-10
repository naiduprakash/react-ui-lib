module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			spacing: {
				4.5: "1.125rem", // 18px
				5.5: "1.375rem", // 22px
				6.5: "1.625rem", // 26px
				7.5: "1.875", // 30px
				8.5: "2.125", // 34px
				9.5: "2.375" // 38px
			},
		
			keyframes: {
				wave: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" }
				}
			}
		}
	},
	plugins: []
};
