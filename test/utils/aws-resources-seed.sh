#!/bin/bash
set -e

# Tópicos para envio das atividades para os serviços
awslocal sns create-topic --name "Accounts_Customer.fifo" --attributes FifoTopic=true,ContentBasedDeduplication=true

# Filas para envio das atividades para os serviços
awslocal sqs create-queue --queue-name "Accounts_Customer_subs_Test.fifo" --attributes FifoQueue=true

# Subscribe entre as filas
awslocal sns subscribe --topic-arn "arn:aws:sns:us-east-1:000000000000:Accounts_Customer.fifo" --protocol sqs --notification-endpoint "arn:aws:sqs:us-east-1:000000000000:Accounts_Customer_subs_Test.fifo"
#http://localhost:4566/_aws/sqs/messages/us-east-1/000000000000/Accounts_Customer_subs_Test.fifo

