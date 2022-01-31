import { Box, Text, TextField, Button, Icon } from '@skynexui/components'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import appConfig from '../config.json'
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import { MessageList } from '../src/components/MessageList'

let username = typeof window !== 'undefined' ? localStorage.getItem('username') : null

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU0NzQyMCwiZXhwIjoxOTU5MTIzNDIwfQ.FPhA4iCzsZBxp1UcxWxJZOz2JWaOziP-xOjVllW-j2o'
const SUPABASE_URL = 'https://ieckdnomhagqpnnjiqkl.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function listenerMessagesRealTime(listener){
  supabaseClient
    .from('mensagens')
    .on('INSERT', (mensagem) => listener(mensagem))
    .on('DELETE', (mensagem) => listener(mensagem))
    .subscribe()
}

function Header() {
  let router = useRouter()

  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Box>
          <span id='username-head'></span>
          <Button
            label='Sair'
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals["000"],
              mainColor: appConfig.theme.colors.primary[500],
              mainColorLight: appConfig.theme.colors.primary[600],
              mainColorStrong: appConfig.theme.colors.primary[600],
            }}
            styleSheet={{
              marginLeft: '10px'
            }}
            onClick={() => {
              if (typeof window !== 'undefined') localStorage.removeItem('username')
              router.push('/')
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default () => {
  let router = useRouter()
  let [message, setMessage] = useState('')

  username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
  let [messageList, setMessageList] = useState([])

  useEffect(() => {
    supabaseClient
    .from('mensagens')
      .select('*')
      .order('id', {ascending: false})
      .then(
        ({ data }) => setMessageList(data)
      )
    document.getElementById('username-head').innerHTML = '@' + username
  }, [])

  function handleNewMessage(newMessage) {
    if (newMessage === '') return

    const message = {
      de: username,
      texto: newMessage
    }

    supabaseClient
      .from('mensagens')
      .insert(message)
      .then()

    setMessage('')
  }

  listenerMessagesRealTime((data) => {
    if (data.eventType === 'INSERT'){
      setMessageList(() => {
        return [
          data.new,
          ...messageList
        ]
      })
    } else if (data.eventType === 'DELETE') {
      setMessageList(() => {
        return messageList.filter((mensagem) => mensagem.id !== data.old.id)
      })
    }
  })

  setTimeout(() => {
    if(username === null && typeof window !== 'undefined') {
      router.push('/')
    }
  }, 5)

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[200],
        backgroundImage: `url(https://cdn1.epicgames.com/offer/fn/19BR_KeyArt_EGS_Launcher_Blade_2560x1440_2560x1440-0c719814e3356a4726560c70f0462e7b)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.primary[400],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
          opacity: '0.9',
          maxWidth: '800px'
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.primary[300],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList mensagens={messageList} usuario={username}/>

          <Box
            as='form'
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto'
            }}
          >
            <TextField
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter'){
                  event.preventDefault()
                  handleNewMessage(message)
                }
              }}
              placeholder='Insira sua mensagem aqui...'
              type='textarea'
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.primary[200],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[900],
              }}
            />
            <ButtonSendSticker onStickerClick={(url) => handleNewMessage(':sticker: '+url)}/>
            <Box
              styleSheet={{
                position: 'relative',
              }}
            >
              <Button
                iconName='FaArrowRight'
                styleSheet={{
                  padding: '0 3px 0 0',
                  width: '50px',
                  height: '50px',
                  fontSize: '20px',
                  marginBottom: '8px',
                  marginLeft: '10px',
                  lineHeight: '20px',
                  padding: '7.5px',
                  backgroundColor: appConfig.theme.colors.primary[500],
                  hover: {
                    backgroundColor: appConfig.theme.colors.primary[600],
                  },
                  focus: {
                    backgroundColor: appConfig.theme.colors.primary[600],
                  },
                }}
                onClick={() => handleNewMessage(message)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}