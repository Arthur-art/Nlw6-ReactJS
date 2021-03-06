import { FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/auth.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import toast, { Toaster } from 'react-hot-toast'

export const NewRoom = () => {

    const { user } = useAuth()

    const notfy = () => toast.error("Digite um nome para sua sala.")

    const history = useHistory()

    const [newRoom, setNewRoom] = useState("")

    const handleCreateRoom = async (event: FormEvent) => {
        event.preventDefault()
        if (newRoom.trim() === "") {
            notfy()
            return;
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/rooms/${firebaseRoom.key}`)

    }

    const Aside = () => {
        return <>
            <aside>
                <img src={illustrationImg} />
                <strong>{"Crie salas de Q&A ao-vivo"}</strong>
                <p>Tire dúvidas da sua audiência em tempo real</p>
            </aside>
        </>
    }

    return (
        <div id="page-auth">
            <Aside />
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" /><br />
                    <>
                        {user?.avatar ? <><img id="user-profile" src={user?.avatar} alt="UserProfile" /><br /></>
                            : <>Carregando...<br /></>}
                    </>
                    {user?.name ? <span>{`Bem vindo ${user?.name?.split(" ")[0]} ${user?.name?.split(" ")[1]} !`}</span> : "Carregando..."}
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input value={newRoom} onChange={event => setNewRoom(event.target.value)} type="text" placeholder="Nome da sala" />
                        <Button type="submit">Criar uma sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente ? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
            <Toaster />
        </div>
    )
}