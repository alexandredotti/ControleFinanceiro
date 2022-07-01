insert into Usuario (nome, email, senha) values ('Alexandre', 'alexandre@alexandre', '$2a$10$6/DXwystdaUUuwmi5k7oVeB1uJj9zkk224VpNtWrex009801kqWHu');

insert into categoria (nome) values ('Supermercado');

insert into conta (usuario_id, numero, agencia, banco, tipo_Conta) values (1 ,'11','11',10,'CC');

insert into movimentacao (conta_id, valor, data_Venc, valor_Pago, data_Pagamento, categoria_id, descricao, tipo_Movimentacao) values (1,100.00,'2022-06-30',100.00,'2022-06-30', 1, 'teste descricao', 'RECEITA');

insert into movimentacao (conta_id, valor, data_Venc, valor_Pago, data_Pagamento, categoria_id, descricao, tipo_Movimentacao) values (1,80.00,'2022-06-30',80.00,'2022-06-30', 1, 'teste descricao', 'DESPESA');

