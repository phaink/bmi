"use client"

import React, { createContext, useState } from "react";

type tThemeContext = "light" | "dark" | undefined


export const ThemeContext = createContext("light")

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
    const [mode, setMode] = useState("light")
    const toggleTheme = (): undefined => {
        setMode(prevMode => prevMode === "light" ? "dark" : "light")
    }
    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <div className={`them ${mode}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}