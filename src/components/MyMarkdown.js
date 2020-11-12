import React from 'react';
import Markdown from 'markdown-to-jsx';

function MyMarkdown(props) {
    return (
        <Markdown options={{
            forceInline: true,
            overrides: {
                a: {
                    props: {
                        target: "_blank",
                        rel: "noopener noreferrer",
                    }
                }
            }
        }}>{props.children}</Markdown>
    )
}

export default MyMarkdown;