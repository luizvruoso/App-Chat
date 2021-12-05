# XasUP
## O melhor whatsapp falso ;)

## Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node](https://nodejs.org/en/download/)
- [React Native](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (Para emular a aplicação) - ou algum outro de sua preferência.

## Instalação

Primeiramente, faremos a configuração do Docker para utilização do MQTT:

- Navegue até o local onde se encontra o arquivo docker-compose.yml
- Abra o terminal de sua preferência, e nele escreva: ```docker-compose up --build -d``` (Tenha certeza que as portas usadas pelo docker não estão sendo usadas) - com este comando, subiremos quatro serviços - O kafka, o mosquitto, zookeeper e o kafka connect;  .
- Após o término do comando, abra o Docker, no caso, o Desktop (para Windows) e entre no terminal do serviço kafka-connect, nele, use o comando su, para conseguir privilégios de root.
- Em seguida, rode o seguinte comando: ```confluent-hub install confluentinc/kafka-connect-mqtt:1.5.1```, pressionando: 2, 'Y', 'Y', 'Y' respectivamente.
- Agora, iremos para a pasta que o comando acabou de baixar, que contém os jars que utilizaremos: ```cd /usr/share/confluent-hub-components/lib```
- Em seguida, já dentro da pasta lib, rodamos o comando: ``` cp -R * /etc/kafka-connect/jars``` e reiniciamos o container kafka-connect do docker.
- Dentro de uma pasta qualquer, crie um arquivo com o seguinte conteúdo, em formato JSON: 
```
{
    "name": "mqtt-source",
    "config": {
        "connector.class": "io.confluent.connect.mqtt.MqttSourceConnector",
        "tasks.max": 1,
        "mqtt.server.uri": "tcp://mosquitto:1883",
        "mqtt.topics": "baeldung",
        "kafka.topic": "connect-custom",
        "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
        "confluent.topic.bootstrap.servers": "kafka:9092",
        "confluent.topic.replication.factor": 1
    }
}
```

Em seguida, abra o cmd na pasta que contém o arquivo JSON e rode: ```curl -d @<caminho_para_o_arquivo>/nome_do_arquivo.json -H "Content-Type: application/json" -X POST http://localhost:8083/connectors```

- Se tudo estiver funcionando, deverá receber uma resposta como: ```{"name":"mqtt-source","config":{"connector.class":"io.confluent.connect.mqtt.MqttSourceConnector","tasks.max":"1","mqtt.server.uri":"tcp://mosquitto:1883","mqtt.topics":"baeldung","kafka.topic":"connect-custom","value.converter":"org.apache.kafka.connect.converters.ByteArrayConverter","confluent.topic.bootstrap.servers":"kafka:9092","confluent.topic.replication.factor":"1","name":"mqtt-source"},"tasks":[],"type":null}```
- Após, abriremos os arquivos do código baixado e, trocaremos o IP para o IPV4 de nosso máquina, em dois locais  ```\app\xasUP\src\service\api.js``` e ```\app\xasUP\src\service\mqtt.js```

- Agora, em cada umas das três partes, instalaremos as dependências do Node usando o comando ```npm i``` (app\xasUP, messagesMiddleware e server).
- Navegaremos para a pasta do messagesMiddleware e rodaremos o comando ```npm start``` - faça o mesmo na pasta server
- Agora, após ter iniciado o emulador de celular, vá apara a pastar app/xasUP e rode ```npx react-native run-android```
- Pronto, a aplicação está funcionando. Aproveite e converse com seus amigos ;)

#Testes
Algumas formas de testes podem ser vistas no video em que mostramos o funcionamento da aplicação: https://youtu.be/5ewvsn4_m7k

## Diagrama de arquitetura do serviço



## License

MIT

