from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(page_title="Jigsaw Puzzle", layout="wide")

project_dir = Path(__file__).parent
html = (project_dir / "index.html").read_text(encoding="utf-8")
css = (project_dir / "style.css").read_text(encoding="utf-8")
javascript = (project_dir / "script.js").read_text(encoding="utf-8")

html = html.replace(
    '<link rel="stylesheet" href="style.css">',
    f"<style>{css}</style>",
)
html = html.replace(
    '<script src="script.js"></script>',
    f"<script>{javascript}</script>",
)

components.html(html, height=850, scrolling=True)