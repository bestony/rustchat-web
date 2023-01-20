// import React from 'react';
import Linkify from "linkify-react";
import 'linkify-plugin-mention';
import URLPreview from './Message/URLPreview';
import Mention from './Message/Mention';

type Props = {
    url?: boolean,
    mention?: boolean,
    mentionTextOnly?: boolean,
    mentionPopOver?: boolean,
    text: string,
    cid?: number
}

const LinkifyText = ({ url = true, mention = true, mentionTextOnly = false, mentionPopOver = true, text, cid }: Props) => {

    return (
        <Linkify options={
            {
                render: {
                    url: ({ content }) => {
                        if (!url) return <>{content}</>;
                        return <>
                            <a className="link" target="_blank" href={content} rel="noreferrer">
                                {content}
                            </a>
                            {!content.startsWith("mailto") && <URLPreview url={content} />}
                        </>;
                    },
                    mention: ({ content }) => {
                        if (!mention) return <>{content}</>;
                        // console.log();
                        if (/@[0-9]+/.test(content)) {
                            const uid = content.trim().slice(1);
                            return <Mention uid={+uid} cid={cid} popover={mentionPopOver} textOnly={mentionTextOnly} />;
                        }
                        return <>{content}</>;
                    }
                }
            }
        }>
            {text}
        </Linkify>
    );
};

export default LinkifyText;