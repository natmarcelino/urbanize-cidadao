import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

type Localizacao = {
  latitude: number;
  longitude: number;
};

export default function NovaSolicitacao() {
  const [tipo, setTipo] = useState('Lote vago');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Localizacao | null>(null);

  // 📍 Localização
  useEffect(() => {
    (async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('Permissão de localização negada.');
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    })();
  }, []);

  // 📸 Escolher foto
  async function escolherFoto() {
    Alert.alert('Adicionar foto', 'Escolha uma opção', [
      { text: 'Câmera', onPress: abrirCamera },
      { text: 'Galeria', onPress: abrirGaleria },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  }

  async function abrirCamera() {
    const { status } =
      await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Permissão de câmera negada.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  }

  async function abrirGaleria() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  }

  function enviarSolicitacao() {
    if (!foto) {
      alert('A foto do problema é obrigatória.');
      return;
    }

    if (!descricao.trim()) {
      alert('Descreva o problema.');
      return;
    }

    if (!location) {
      alert('Localização inválida.');
      return;
    }

    setLoading(true);

    console.log({
      tipo,
      descricao,
      foto,
      location,
    });

    setTimeout(() => {
      setLoading(false);
      alert('Solicitação enviada com sucesso!');
      router.replace("");
    }, 1500);
  }

  function renderTipo(label: string) {
    const ativo = tipo === label;

    return (
      <TouchableOpacity
        style={[styles.tipoCard, ativo && styles.tipoCardAtivo]}
        onPress={() => setTipo(label)}
      >
        <Text style={[styles.tipoText, ativo && styles.tipoTextAtivo]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        {/* MAPA */}
        <Text style={styles.title}>Localização do problema</Text>
        <Text style={styles.helper}>
          Arraste o marcador para ajustar o local
        </Text>

        <View style={styles.mapContainer}>
          {location ? (
            <MapView
              style={styles.map}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              onPress={(e) =>
                setLocation(e.nativeEvent.coordinate)
              }
            >
              <Marker
                coordinate={location}
                draggable
                onDragEnd={(e) =>
                  setLocation(e.nativeEvent.coordinate)
                }
              />
            </MapView>
          ) : (
            <Text style={styles.mapLoading}>Carregando mapa...</Text>
          )}
        </View>

        {/* FOTO */}
        <Text style={styles.title}>
          Foto do problema <Text style={{ color: '#DC2626' }}>*</Text>
        </Text>

        <TouchableOpacity
          style={styles.photoBox}
          onPress={escolherFoto}
        >
          {foto ? (
            <Image source={{ uri: foto }} style={styles.photo} />
          ) : (
            <>
              <Text style={styles.photoIcon}>📷</Text>
              <Text style={styles.photoText}>Adicionar foto</Text>
              <Text style={styles.photoRequired}>Obrigatório</Text>
            </>
          )}
        </TouchableOpacity>

        {/* TIPO */}
        <Text style={styles.title}>Qual problema deseja relatar?</Text>

        <View style={styles.tiposContainer}>
          {renderTipo('Lote vago')}
          {renderTipo('Coleta de lixo')}
          {renderTipo('Buraco')}
          {renderTipo('Iluminação')}
        </View>

        {/* DESCRIÇÃO */}
        <Text style={styles.title}>Descreva o problema</Text>

        <TextInput
          style={styles.textArea}
          placeholder="Escreva uma descrição do problema..."
          multiline
          maxLength={300}
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.charCount}>
          {descricao.length}/300
        </Text>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.button}
          onPress={enviarSolicitacao}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Enviar solicitação</Text>
          )}
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6F8',
    padding: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    elevation: 4,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    marginTop: 10,
  },

  helper: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },

  mapContainer: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    marginBottom: 18,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapLoading: {
    textAlign: 'center',
    marginTop: 70,
    color: '#6B7280',
  },

  photoBox: {
    height: 170,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  photoIcon: {
    fontSize: 30,
    marginBottom: 6,
  },

  photoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },

  photoRequired: {
    fontSize: 12,
    color: '#DC2626',
    marginTop: 4,
  },

  tiposContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },

  tipoCard: {
    width: '48%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },

  tipoCardAtivo: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },

  tipoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },

  tipoTextAtivo: {
    color: '#2E7D32',
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    minHeight: 110,
    textAlignVertical: 'top',
  },

  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
