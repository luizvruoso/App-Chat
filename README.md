# Enunciado

Em um planeta muiiiito muiiiiiiito distante, chamado Xastre Planet, os xastráqueos elevaram o nível de comunicação usando um sistema de comunicação que ficou bastante popular o XasUp APP.

Esse sistema é bastante simples, pois possibilita aos xastráqueos trocarem xassagens entre eles, texto apenas!

Só é possível trocar xassagens entre xastráqueos que autorizaram essa troca, ou seja, deve existir uma funcionalidade de pedir e receber (ou não) autorização de adicionar o xastato dos xastráqueos. É possível também, a qualquer momento, revogar essa autorização. Porém, o que mais chamou a atenção dos xastráqueos foi a possibilidade de se criar xasgrupos e fazer com que as xassagens saiam de um xastraqueo e vá para todos do grupo. Por fim, existe uma forma de verificar se a xassagem chegou até o destinatário e também se ela foi lida ou não, isso é disponível apenas em mensagens ponto a ponto, não em grupo.

Só que existe um problema, a demanda lá no Xastre Planet ficou muito grande e o aplicativo como foi concebido não suporta mais nenhum usuário novo, por isso, os xastráqueos donos do XasUp APP querem contratar um grupo de terráqueos para propor uma nova arquitetura e uma solução que pode ser escalável.

O grupo escolhido foi o seu, parabéns pela oportunidade!

 

## Nota técnica:
1. Estudar e implementar MQTT (servidor mosquitto - exemplo aqui (Links para um site externo.))
2. Existem protocolos mais parrudos do que o MQTT, tal como explicado aqui (Links para um site externo.).
3. Leve em consideração uma arquitetura de mensageria para suportar um fluxo grande de informações, usando o Zookeeper (Links para um site externo.) e Kafka (Links para um site externo.). Podem considerar outras possibilidades.
4. Não é necessário guardar nenhuma mensagem em banco.
5. Podem usar qualquer linguagem de sua preferência para fazer as interfaces gráficas para os xastráqueos escreverem e lerem as mensagens.
6. Sugiro a adoção de dockers para os ambientes de configurados de servidores.
7. API em nodeJS
