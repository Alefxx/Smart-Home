const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, email, password, lockCode } = req.body;

    // 1. Validação de campos obrigatórios
    if (!name || !email || !password || !lockCode) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // 2. Validação do código da tranca
    const SERVER_LOCK_CODE = process.env.LOCK_CODE || "12345678";
    if (lockCode !== SERVER_LOCK_CODE) {
      return res.status(400).json({ message: "Código da tranca inválido." });
    }

    // 3. Validação do formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de e-mail inválido." });
    }

    // 4. Validação da senha
    if (password.length < 8) {
      return res.status(400).json({ message: "A senha deve ter no mínimo 8 dígitos." });
    }

    // 5. Verificar se e-mail já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado." });
    }

    // 6. Criptografar a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 7. Salvar usuário no banco (o lockCode não é salvo)
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Preencha e-mail e senha." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    res.json({ message: "Login realizado com sucesso!", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

module.exports = {
  register,
  login,
};
