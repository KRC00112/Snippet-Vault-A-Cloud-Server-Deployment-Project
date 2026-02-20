
import './App.css'
import {useState} from "react";




function SnippetCardList({list,removeCard}){




    return(
        <>

        {list.map((obj) => (
            <div key={obj.id} className="card right-card">
                <div>{obj.title}[{obj.language}]</div>

                <div className='right-card-snippet'>{obj.code}</div>
                <div className='snippet-operations'>
                    <button>copy</button>
                    <button onClick={()=>{removeCard(obj.id)}}>delete</button>
                </div>
            </div>


        ))}

    </>

    );

}


function AllSnippets({snippets,languageList,removeCard}) {



    const [selectedLanguageTag, setSelectedLanguageTag] = useState('all');
    const taggedSnippets=snippets.filter(obj=>obj.language===selectedLanguageTag)

    return (
        <div className="">
            <div className='all-tags'>
                <button className='all-btn' onClick={()=>{setSelectedLanguageTag('all')}}>All</button>
                <div className='language-tags'>
                    {languageList.slice(1,).map((language) => (
                        <li key={language}><button onClick={()=>{setSelectedLanguageTag(language)}}>{language}</button></li>
                    ))}
                </div>



            </div>


            <div>



                {selectedLanguageTag!=='all' && <SnippetCardList list={taggedSnippets} removeCard={removeCard}/>}
                {selectedLanguageTag==='all' && <SnippetCardList list={snippets} removeCard={removeCard}/>}



            </div>


        </div>
    )

}

function AddSnippet({languageList, addSnippetOnClick}){
    const [title, setTitle] = useState('')
    const [language, setLanguage] = useState(languageList[0]);
    const [code, setCode] = useState('');


    return(
        <div className='card'>
            <p className='create-snippet-heading'>NEW SNIPPET</p>
            <input type='text' className='input-title card-border' placeholder='Give snippet a title' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <select className='languages-drop-down' name="languages" value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                {languageList.map((item,index) => (
                    <option key={index} >{item}</option>
                ))}
            </select>
            <textarea className='input-snippet card-border' placeholder='Paste snippet' rows={10} value={code} onChange={(e)=>{setCode(e.target.value)}}></textarea>
            <button className='add-snippet-btn card-border' onClick={()=>addSnippetOnClick({id:Date.now(),title:title,language:language,code:code})}>Add Snippet</button>
        </div>
    );

}


function App() {

    let languageList=['Select a language','HTML', 'CSS', 'JavaScript', 'Python', 'C++', 'C'];

    const [snippets,setSnippets]=useState([]);

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
            <div>Snippet Vault</div>
        </header>
        <section className='workspace'>
            <section className='left-section'>
                <AddSnippet addSnippetOnClick={addSnippetOnClick} languageList={languageList}/>
            </section>
            <section className='right-section'>
                <AllSnippets snippets={snippets} languageList={languageList} removeCard={removeCard}/>
            </section>
        </section>


    </div>
  )
}

export default App
