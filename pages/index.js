import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'
import { useRouter } from 'next/router'
import { useState } from 'react'

// Componente React
function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['700']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

function InvalidUser(){
  document.getElementById('form-submit').setAttribute('disabled', true)
  document.getElementById('user-image').style.display = 'none'
  document.getElementById('fail-image').style.display = 'block'
  if (document.getElementById('username-input').value !== '') document.getElementById('user-name').innerHTML = 'Nome de usário inválido!'
  else document.getElementById('user-name').innerHTML = 'Insira o nome de usuário!'
}

function ValidUser() {
  document.getElementById('form-submit').removeAttribute('disabled')
  document.getElementById('fail-image').style.display = 'none'
  document.getElementById('user-image').style.display = 'block'
}

export default function PaginaInicial() {
  let router = useRouter()
  let [username, setUsername] = useState('leonetecbr')
  const user = typeof window !== 'undefined' ? localStorage.getItem('username') : null

  if (user){
    router.push('/chat')
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[200],
          backgroundImage: 'url(https://cdn1.epicgames.com/offer/fn/19BR_KeyArt_EGS_Launcher_Blade_2560x1440_2560x1440-0c719814e3356a4726560c70f0462e7b)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals['050'],
          }}
        >

          
          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals['100'],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[200],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
              marginBottom: '15px',
              marginTop: '15px'
            }}
          >
            <Image
              id='user-image'
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                display: 'block'
              }}
              src={`https://github.com/${username}.png`}
              onError={InvalidUser}
              onLoad={ValidUser}
            />
            <Image
              id='fail-image'
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                display: 'none'
              }}
              src={`/Fortnite.png`}
            />
            <Text
              id='user-name'
              variant='body4'
              styleSheet={{
                color: appConfig.theme.colors.neutrals[700],
                backgroundColor: appConfig.theme.colors.neutrals['000'],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
          {/* Formulário */}
          <Box
            as='form'
            onSubmit={(event) => {
              event.preventDefault()
              if (typeof window !== 'undefined') localStorage.setItem('username', document.getElementById('username-input').value)
              router.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
            autoComplete='off'
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              id='username-input'
              placeholder="Digite seu usuário do GitHub ..."
              value={username}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[900],
                  mainColor: appConfig.theme.colors.neutrals[200],
                  mainColorHighlight: appConfig.theme.colors.primary[900],
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                },
              }}
              onChange={(event) => {
                let valor = event.target.value
                setUsername(valor)
              }}
            />
            <Button
              id="form-submit"
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

        </Box>
      </Box>
    </>
  );
}