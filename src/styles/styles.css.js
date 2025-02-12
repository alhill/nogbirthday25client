import { style, keyframes } from "@vanilla-extract/css";

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

export const container = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "0 auto",
    position: "relative",
    maxWidth: 600
})

export const msgWrapper = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: "1rem",
    minHeight: "calc(100vh - 6rem)",
    height: "calc(100vh - 6rem)",
    flex: 1,
    overflowY: "auto"
})

export const inputBox = style({
    position: "sticky",
    bottom: "2rem",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    margin: "0 auto",
    backgroundColor: "gainsboro",
    borderRadius: "1rem",
    overflow: "hidden",
    marginTop: "2rem",
    border: "1px solid black",
    height: "2.5rem",
    input: {
        padding: "0.5rem",
        fontSize: "1.25rem",
        flex: 1,
        border: "none",
        borderRight: "1px solid black"
    },
    ".btn": {
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        padding: "0.25rem 0.6rem 0.25rem 0.5rem",
        transition: "all 300ms",
        cursor: "pointer",
       
        height: "100%",
        "&:hover": {
            transform: "scale(1.5)"
        },
        "&.loading": {
            animation: `${spin} 1.5s linear infinite`
        }
    }
})

export const msgRow = style({
    display: "flex",
    width: "100%"
})

export const msgBox = style({
    padding: "0.75rem 1.5rem",
    maxWidth: "70%",
    border: "1px solid black",
    borderRadius: "1rem"
})

export const hiddenBtn = style({
    position: "absolute",
    top: "-2rem",
    left: "-2rem",
    padding: "0.5rem 1rem",
})

export const secretModal = style({
    position: "absolute",
    top: "10rem",
    left: "0.5rem",
    padding: "1rem 2rem",
    width: "calc(100vw - 9rem)",
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "1rem"
})

export const btnWrapper = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
})

export const btn = style({
    backgroundColor: "gainsboro",
    borderRadius: "0.5rem",
    border: "1px solid black",
    padding: "0.25rem 0.5rem",
    transition: "all 300ms",
    ":hover": {
        opacity: 0.5
    }
})