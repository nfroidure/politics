"use client";

import styles from "./gallery.module.scss";
import { useState } from "react";
import { type MarkdownImageNode, qualifyPath } from "../utils/markdown";

export default function Gallery({
  imagesNodes,
}: {
  imagesNodes: MarkdownImageNode[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.root}>
      <p>
        <img
          src={qualifyPath(imagesNodes[selectedIndex].url)}
          alt={imagesNodes[selectedIndex].alt || ""}
        />
      </p>
      <ul>
        {imagesNodes.map((imageNode, index) => (
          <li key={index}>
            <a onClick={setSelectedIndex.bind(null, index)}>
              <img src={qualifyPath(imageNode.url)} alt={imageNode.alt || ""} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
