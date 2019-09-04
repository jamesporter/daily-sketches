import React from "react"

export function Container({ children }) {
  return <div className="container">{children}</div>
}

export function Spacer({ large }: { large?: boolean }) {
  return <div className={large ? "spacer-large" : "spacer"} />
}

export function H1({ children }) {
  return <h1 className="blue-dark">{children}</h1>
}

export function H2({ children }) {
  return <h2 className="green-dark">{children}</h2>
}

export function H3({ children }) {
  return <h3 className="blue">{children}</h3>
}

export function Grid({ children }) {
  return <div className="grid">{children}</div>
}

export function PreviewContainer({ children }) {
  return <div className="preview-container">{children}</div>
}
