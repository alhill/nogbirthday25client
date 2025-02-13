import { useState, useEffect, useRef } from 'preact/hooks'
import { container, msgWrapper, inputBox, msgRow, msgBox, hiddenBtn, secretModal, btnWrapper, btn } from './styles/styles.css.js'

export function App() {
  const workerRoot = import.meta.env.MODE === "development" ? "http://localhost:8787" : "https://nogbirthday25.alvarogil37.workers.dev"
  const [conv, setConv] = useState([])
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const msgWrapperRef = useRef(null)

  const sendMsg = async () => {
    setLoading(true)
    try{
      const res = await fetch(workerRoot + "/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: msg })
      })
      const text = await res.text()
      setConv([
        ...conv,
        { role: "user", content: msg },
        { role: "assistant", content: text.slice(1, -1) }
      ])
      setMsg("")
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  const resetConversation = async () => {
    try{
      await fetch(workerRoot + "/reset")
      window.location.reload()
    } catch(err) {
      console.log(err)
    }
    setModal(false)
  }

  useEffect(() => {
    (async () => {
      try{
        const res = await fetch(workerRoot + "/get-history", {
          headers: { "Content-Type": "application/json" }
        })
        const jsonStr = await res.json()
        const parsedHistory = JSON.parse(jsonStr) || []
        setConv(parsedHistory)
      } catch(err) {
        console.error("Couldn't load chat history", err)
      }
    })()
  }, [])

  useEffect(() => {
    if (msgWrapperRef.current) {
      const lastMessage = msgWrapperRef.current.lastChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [conv])

  return (
    <div className={container}>
      <div 
        className={hiddenBtn}
        onClick={() => setModal(true)}
      >&nbsp;&nbsp;&nbsp;</div>
      <div 
        className={msgWrapper} 
        ref={msgWrapperRef}
      >
        { conv.map((msg => {
          return (
            <div
              className={msgRow}
              style={{ justifyContent: msg.role === "user" ? "flex-start" : "flex-end" }}
            >
              <div 
                className={msgBox}
                style={{ backgroundColor: msg.role === "user" ? "lightgreen" : "lightblue" }}
              >{ msg.content }</div>
            </div>
          )
        }))}
      </div>
      <div className={inputBox}>
        <input 
          onChange={evt => setMsg(evt.target.value)}
          value={msg}
          disabled={loading}
        />
        <div 
          className={`btn${loading ? " loading" : ""}`}
          onClick={() => !loading && sendMsg()}
        >{ loading ? "⚙️" : "✏️" }</div>
      </div>
      { modal && (
        <div className={secretModal}>
          <p style={{ marginTop: 0 }}>Encontraste el botón secreto!!</p>
          <p>¿Estás seguro de que deseas reiniciar la conversación?</p>
          <div className={btnWrapper}>
            <div 
              className={btn}
              onClick={() => resetConversation()}
            >Aceptar</div>
            <div 
              className={btn}
              onClick={() => setModal(false)}
            >Cancelar</div>
          </div>
        </div>
      )}
    </div>
  )
}
