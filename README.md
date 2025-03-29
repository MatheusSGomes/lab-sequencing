# Lab Sequencing

Caso de uso:

### **Sistemas de Logística e Uso de Sequences**

Os **sistemas de logística** gerenciam o transporte e armazenamento de produtos. Eles precisam de identificadores únicos para rastrear **pedidos, pacotes, entregas, transportadoras e motoristas**.

✅ **Exemplos de dados que precisam de sequences:**
- Número de rastreamento do pacote (`tracking_id`).
- ID do pedido (`pedido_id`).
- ID da transportadora (`transportadora_id`).
- ID do motorista (`motorista_id`).

---

### **Vantagens de Usar Sequence em Sistemas de Logística**
- ✅ **Evita duplicação de IDs**: Cada rastreamento tem um identificador único.
- ✅ **Melhor desempenho**: Sequences são otimizadas para gerar IDs rapidamente.
- ✅ **Escalabilidade**: Funciona bem para milhões de registros.

---

### **Exemplo de Sequence no PostgreSQL**

Aqui está um exemplo de **tabela de rastreamento de entregas** usando **sequence** no PostgreSQL:

```sql
-- Criando uma sequence para gerar IDs únicos
CREATE SEQUENCE tracking_id_seq START WITH 1000 INCREMENT BY 1;

-- Criando a tabela de rastreamento de entregas
CREATE TABLE rastreamento (
    id SERIAL PRIMARY KEY, -- Também poderia usar DEFAULT nextval('tracking_id_seq')
    tracking_id INT NOT NULL DEFAULT nextval('tracking_id_seq'),
    pedido_id INT NULL,
    transportadora_id INT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Em trânsito',
    data_envio TIMESTAMP DEFAULT NOW()
);
```

---

### **Inserir rastreamentos**

```sql
INSERT INTO rastreamento (pedido_id, transportadora_id) VALUES (12345, 7);
INSERT INTO rastreamento (pedido_id, transportadora_id) VALUES (12346, 8);
```

Cada nova entrega cadastrada recebe um **tracking_id** único gerado automaticamente pela sequence.

---

### **Consultar as Entregas**

```sql
SELECT * FROM rastreamento;
```

**Saída esperada:**

| id | tracking_id | pedido_id | transportadora_id | status      | data_envio           |
|----|------------|-----------|-------------------|------------|----------------------|
| 1  | 1000       | 12345     | 7                 | Em trânsito | 2025-03-26 12:00:00 |
| 2  | 1001       | 12346     | 8                 | Em trânsito | 2025-03-26 12:05:00 |
