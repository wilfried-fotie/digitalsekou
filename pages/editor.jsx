import React, { Component } from 'react'
import { EditorState, ContentState, convertFromHTML  } from "draft-js";
import dynamic from 'next/dynamic';
// import apiClient from '../api/api_client'
import { convertFromRaw, convertToRaw } from 'draft-js';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class ArticleEditor extends Component {
    constructor(props) {
        super(props);


        this.state = {
            editorState:
                
                this.props.edit ?
                EditorState.createWithContent(
                ContentState.createFromBlockArray(
                     convertFromHTML(this.props.state) 
                )
                    ) :
                    
                    EditorState.createEmpty(),
        }

        // this.state = {
        //     editorState: EditorState.createEmpty()
        // };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        this.props.handleContent(
            convertToRaw(editorState.getCurrentContent()
            ));
    };

    
    // onEditorStateChange = (editorState) => {
    //     this.setState({
    //         editorState
    //     });

        
    // }

    // uploadImageCallBack = async (file) => {
    //     const imgData = await apiClient.uploadInlineImageForArticle(file);
    //     return Promise.resolve({
    //         data: {
    //             link: `${process.env.NEXT_PUBLIC_API_URL}${imgData[0].formats.small.url}`
    //         }
    //     });
    // }

    render() {
        const { editorState } = this.state;
        const {height} = this.props.height || "auto"
        return (
            <div className="editor" style={{ height: height }}>
            <Editor
                editorState={editorState}
                defaultEditorState={this.props.state}
                toolbarClassName="toolbar-class"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                onEditorStateChange={this.onEditorStateChange}
                // toolbarOnFocus
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', "colorPicker", 'textAlign',  'link',  'emoji', 'history'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    // image: {
                    //     urlEnabled: true,
                    //     uploadEnabled: true,
                    //     uploadCallback: this.uploadImageCallBack,
                    //     previewImage: true,
                    //     alt: { present: false, mandatory: false }
                    // },
                }}
                />
            </div>
        )
    }
}