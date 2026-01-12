# 🐷 Pig Head - Scoreboard

Um placar digital bonito e intuitivo para o jogo **Pig** (Pass the Pigs), desenvolvido com HTML, CSS e JavaScript puro.

🔗 **Acesse agora:** [pig-scoreboard.netlify.app](https://pig-scoreboard.netlify.app)

---

## 📸 Preview

![Pig Head Scoreboard](https://img.shields.io/badge/Status-Online-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Funcionalidades

- ➕ **Adicionar jogadores** - Cadastre quantos jogadores quiser
- 🎯 **Pontuação rápida** - Botões de +1, +5, +10, +15, +20, +40 e +60 pontos
- 🏆 **Detecção de vencedor** - Declara automaticamente quando alguém atinge 100 pontos
- 🚫 **WO (Walkover)** - Remova jogadores durante a partida
- 🔄 **Zerar rodada/jogador/tudo** - Controle total sobre os pontos
- 💾 **Salva automaticamente** - Usa localStorage para não perder o jogo
- 📱 **Responsivo** - Funciona em celular, tablet e desktop
- 📘 **Regras inclusas** - Tabela de pontuação oficial do Pig

---

## 🎮 Como Jogar

1. Acesse [pig-scoreboard.netlify.app](https://pig-scoreboard.netlify.app)
2. Adicione os nomes dos jogadores (mínimo 2)
3. Clique em **Iniciar Jogo**
4. Durante cada turno:
   - Clique nos botões de pontos conforme o resultado dos dados
   - Clique em **Parar** para salvar os pontos e passar a vez
   - Clique em **Zerar rodada** se errar (Pig Out)
5. O primeiro a chegar em **100 pontos** vence! 🎉

---

## 📋 Tabela de Pontuação (Pass the Pigs)

![Tabela de Pontuação](img/scoring_positions.png)

| Posição | Pontos | Descrição |
|---------|--------|-----------|
| **Sider** | 1 | Os dois porcos caem do mesmo lado (ambos com ponto ou sem ponto para cima) |
| **Trotter** | 5 | O porco cai em pé (nas quatro patas) |
| **Razorback** | 5 | O porco cai de costas |
| **Snouter** | 10 | O porco cai apoiado no nariz |
| **Leaning Jowler** | 15 | O porco cai apoiado na orelha/bochecha |
| **Pig Out** | 0 | Um porco vira para um lado e o outro para o outro (Perde pontos da rodada) |
| **Double Trotter** | 20 | Dois Trotters |
| **Double Razorback** | 20 | Dois Razorbacks |
| **Double Snouter** | 40 | Dois Snouters |
| **Double Leaning Jowler** | 60 | Dois Leaning Jowlers |
| **Mixed Combo** | Soma | Soma das posições individuais (ex: Trotter + Snouter = 15) |
| **Makin' Bacon** | ZERA TUDO | Os porcos se tocam (Perde TODOS os pontos do jogo) |
| **Piggy Back** | Impossível | Um porco em cima do outro |

---

## 🛠️ Tecnologias

- **HTML5** - Estrutura
- **CSS3** - Estilização com gradientes e efeitos glassmorphism
- **JavaScript** - Lógica do jogo
- **Notiflix** - Notificações e modais bonitos
- **LocalStorage** - Persistência de dados

---

## 🚀 Deploy

O projeto está hospedado gratuitamente no **Netlify** com deploy automático via GitHub.

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://pig-scoreboard.netlify.app)

---

## 👨‍💻 Autor

Desenvolvido com 💖 por **[Barbosasw](https://www.linkedin.com/in/wallace-barbosa-1a7488328/)**

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
