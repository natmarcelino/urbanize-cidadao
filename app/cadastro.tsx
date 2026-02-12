import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function Cadastro() {
  // ===== STATES =====
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [quadra, setQuadra] = useState('');
  const [lote, setLote] = useState('');

  const [erro, setErro] = useState('');

  // ===== FUNÇÕES =====
  function validarEmail(valor: string) {
    return /\S+@\S+\.\S+/.test(valor);
  }

  function validarCPF(valor: string) {
    const cpfLimpo = valor.replace(/\D/g, '');
    return cpfLimpo.length === 11;
  }

  async function buscarCep(valor: string) {
    const cepLimpo = valor.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();

      if (data.erro) return;

      setRua(data.logradouro || '');
      setCidade(data.localidade || '');
      setEstado(data.uf || '');
    } catch {
      setErro('Erro ao buscar o CEP.');
    }
  }

  function handleCadastro() {
    if (!nome || !cpf || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!validarCPF(cpf)) {
      setErro('CPF inválido.');
      return;
    }

    if (!validarEmail(email)) {
      setErro('E-mail inválido.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setErro('');
    alert('Cadastro validado com sucesso!');
    // aqui depois entra o envio para o backend
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Cadastro do cidadão</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>Dados pessoais</Text>

        <TextInput
          placeholder="Nome completo"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="CPF"
          style={styles.input}
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />

        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          placeholder="Confirmar senha"
          style={styles.input}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <Text style={styles.sectionTitle}>Endereço</Text>

        <TextInput
          placeholder="CEP"
          style={styles.input}
          keyboardType="numeric"
          value={cep}
          onChangeText={(text) => {
            setCep(text);
            buscarCep(text);
          }}
        />

        <TextInput
          placeholder="Rua"
          style={styles.input}
          value={rua}
          onChangeText={setRua}
        />

        <TextInput
          placeholder="Número (opcional)"
          style={styles.input}
          keyboardType="numeric"
          value={numero}
          onChangeText={setNumero}
        />

        <TextInput
          placeholder="Cidade"
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
        />

        <TextInput
          placeholder="Estado (UF)"
          style={styles.input}
          value={estado}
          onChangeText={setEstado}
          autoCapitalize="characters"
          maxLength={2}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="Quadra"
            style={[styles.input, styles.half]}
            value={quadra}
            onChangeText={setQuadra}
          />

          <TextInput
            placeholder="Lote"
            style={[styles.input, styles.half]}
            value={lote}
            onChangeText={setLote}
          />
        </View>

        {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.backText}>Já tenho conta</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 160,
    height: 160,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  half: {
    width: '48%',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 14,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  backText: {
    textAlign: 'center',
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',

  },
});
