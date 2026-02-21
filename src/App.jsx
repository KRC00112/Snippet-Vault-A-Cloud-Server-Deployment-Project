
import './App.css'
import {useState} from "react";




function SnippetCardList({list,removeCard}){


    const formattedDate=(date)=>{
        return date.toLocaleDateString("en-GB",{
            day:"numeric",
            month:"long",
            year:"numeric",
        });
    }

    return(
        <>
        {list.map((obj) => (
            <div key={obj.id} className="card right-card">
                <div className='right-card-heading'>
                    <div className='right-card-title-and-language'>
                        <div className='right-card-title-label'>{obj.title}</div>
                        <div className='right-card-language-label'>{obj.language}</div>
                    </div>
                    <div className='date'>{formattedDate(new Date(obj.id))}</div>
                </div>
                <div className='right-card-snippet'>{obj.code}</div>
                <div className='snippet-operations'>
                    <button className='copy-btn' onClick={() => navigator.clipboard.writeText(obj.code)}>⧉ COPY</button>
                    <button className='delete-btn' onClick={()=>{removeCard(obj.id)}}>✕ DELETE</button>
                </div>
            </div>
        ))}
    </>
    );
}


function AllSnippets({snippets,languageList,removeCard,query,onChangeQuery,focused,handleFocus}) {
    const [selectedLanguageTag, setSelectedLanguageTag] = useState('all');

    const filteredList=query?snippets.filter(snippet=>snippet.title.toLowerCase().includes(query.toLowerCase())):snippets;
    const displayList=selectedLanguageTag==='all'?filteredList:filteredList.filter(snippet=>snippet.language===selectedLanguageTag)
    return (
        <>
            <input type='text' className={`card-inputs ${focused==='search'?'clicked':''}`} onFocus={()=>{handleFocus('search')}} onBlur={()=>{handleFocus('')}} placeholder='Search snippets...' value={query} onChange={(e)=>{onChangeQuery(e)}}></input>
            <div className='all-tags'>
                <button className={`card tag-btns ${selectedLanguageTag==='all'?'selected-snippet':''}`} onClick={()=>{setSelectedLanguageTag('all')}}>All</button>
                <ul className='language-tags'>
                    {languageList.slice(1,).map((language) => (
                        <li key={language}><button className={`card tag-btns ${selectedLanguageTag===language?'selected-snippet':''}`} onClick={()=>{setSelectedLanguageTag(language)}}>{language}</button></li>
                    ))}
                </ul>
            </div>
            <div>

                {displayList.length<=0?<div className='card placeholder'>
                        <div className='placeholder-logo'>{`\{  \}`}</div>
                        <div className='placeholder-message'>
                            <span>NO SNIPPETS HERE!</span>
                        </div>
                </div>:<>
                    <SnippetCardList list={displayList} removeCard={removeCard}/>
                </>}

            </div>
        </>
    )
}

function AddSnippet({languageList, addSnippetOnClick, focused, handleFocus}){
    const [title, setTitle] = useState('')
    const [language, setLanguage] = useState(languageList[0]);
    const [code, setCode] = useState('');

    const handleAddSnippetBtnClick = ()=>{

        addSnippetOnClick({id:Date.now(),title:title,language:language,code:code})
        setTitle('')
        setLanguage(languageList[0]);
        setCode('')

    }

    return(
        <div className='card add-snippet-card'>
            <p className='add-snippet-heading'>NEW SNIPPET</p>
            <input type='text' className={`card-inputs ${focused==='title'?'clicked':''}`} onFocus={()=>{handleFocus('title')}} onBlur={()=>{handleFocus('')}} placeholder='Give snippet a title' value={title}  onChange={(e)=>{setTitle(e.target.value)}}></input>
            <select className={`card-inputs language-drop-down ${focused==='language'?'clicked':''}`} onFocus={()=>{handleFocus('language')}} onBlur={()=>{handleFocus('')}}  name="languages" value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                {languageList.map((item,index) => (
                    <option key={index} >{item}</option>
                ))}
            </select>
            <textarea className={`input-snippet card-inputs ${focused==='snippet'?'clicked':''}`} onFocus={()=>{handleFocus('snippet')}} onBlur={()=>{handleFocus('')}} placeholder='Paste your snippet here...' rows={10} value={code} onChange={(e)=>{setCode(e.target.value)}}></textarea>
            <button className='add-snippet-btn card' onClick={()=>handleAddSnippetBtnClick()}>+ ADD SNIPPET</button>
        </div>
    );
}

function App() {


    let languageList = ['Select a language','JavaScript','Python','Java','C#','C','C++','TypeScript','PHP','Go','Swift'];
    const [snippets,setSnippets]=useState([]);
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState('');

    const handleFocus=(comp)=>{
        setFocused(comp)
    }

    const onChangeQuery=(e)=>{
        setQuery(e.target.value)
    }
    const removeCard=(id)=>{
        setSnippets(prev=>prev.filter(item=>item.id!==id))
    }
    const addSnippetOnClick=(item)=>{
        if(item.language!==languageList[0] && item.title!=="" && item.code!=="") {
            setSnippets(prev => [...prev, item]);
        }
    }
  return (
    <div className='page'>
        <header>
            <div className='header-left'>
                <span className='header-icon'>{'</>'}</span>
                <span className='header-name'>Snippet Vault</span>
            </div>
            <label className='snippets-count-label'>{snippets.length} SNIPPET{snippets.length===1?'':'S'}</label>
        </header>
        <section className='workspace'>
            <section className='left-section'>
                <AddSnippet addSnippetOnClick={addSnippetOnClick} languageList={languageList} focused={focused} handleFocus={handleFocus}/>
            </section>
            <section className='right-section'>
                <AllSnippets snippets={snippets} languageList={languageList} removeCard={removeCard} query={query} onChangeQuery={onChangeQuery} focused={focused} handleFocus={handleFocus}/>
            </section>
        </section>
    </div>
  )
}

export default App
