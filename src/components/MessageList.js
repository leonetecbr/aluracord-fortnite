import { Box, Text, Image } from '@skynexui/components'
import appConfig from '../../config.json'

export function MessageList(props) {

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        marginBottom: '16px',
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag='li'
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              backgroundColor: appConfig.theme.colors.primary[600],
              hover: {
                backgroundColor: appConfig.theme.colors.primary[700],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: 'flex',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  marginRight: '8px',
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">
                {mensagem.de}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                  marginLeft: 'auto',
                  marginRight: '5px'
                }}
                tag="span"
              >
                {new Date(mensagem.created_at).toLocaleDateString()}
              </Text>
            </Box>
            <Box
              styleSheet={{
                padding: '5px',
              }}
            >
              {mensagem.texto.startsWith(':sticker:')
                ? (
                  <Image
                    src={mensagem.texto.replace(':sticker: ', '')}
                    styleSheet={{
                      margin: 'auto'
                    }}
                  />
                ) : (mensagem.texto)}
            </Box>
          </Text>
        )
      })}
    </Box>
  )
}