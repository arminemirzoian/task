import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import {DraggableArea} from 'react-draggable-tags';


const Home = ({handleLogout}) => {
    const [value, setValue] = useState(initialValue);
    const [items, setItems] = useState([]);
    const editor = useMemo(() => withReact(createEditor()), []);
    const words = items.map((word, i) => {
        return {
            id: i + 1,
            content: word,
        };
        });

        const onAdd = () => {     
        setItems([...items, value[0].children[0].text]);
        setValue(initialValue);  
    };

    return (
        <section className='home'>
            <nav>
                <h2>Welcome to dashboard</h2>
                <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </nav>
        <Slate
            editor={editor}
            value={value}
            onChange={(value) => setValue(value)}
            >
            <Editable
                className="input"
                placeholder="Type a text here"
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                    event.preventDefault();
                    onAdd();
                    }
                }} 
            />    
        </Slate>
    
    <div className="add-content">
        <button onClick={onAdd} className="add-btn">
            Add
        </button>
        </div>
        <div className="Simple">
        <DraggableArea
            tags={words}
            render={({tag, index}) => (
            <div className="tag">
                {tag.content}
            </div>
            )}
            onChange={tags => tags}
        />
        </div>
        </section>
    );
};

const initialValue = [
    {  
        children: [{ text: '' }],
    },
    ];

export default Home;