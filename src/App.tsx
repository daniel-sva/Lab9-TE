import './App.css';

// Definir el tipo Student
type Student = {
  id: number;
  name: string;
  scores: number[];
};

// Escribir safeParse
function safeParse(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// Escribir un type guard
function isStudent(x: unknown): x is Student {
  return (
    typeof x === 'object' &&
    x !== null &&
    'id' in x && typeof (x as any).id === 'number' &&
    'name' in x && typeof (x as any).name === 'string' &&
    'scores' in x && Array.isArray((x as any).scores) &&
    (x as any).scores.every((score: unknown) => typeof score === 'number')
  );
}

// Calculo promdio de Student (funcion average)
function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, curr) => acc + curr, 0);
  return sum / nums.length;
}

// Componente de React
export default function App() {
  // Simular la respuesta JSON de la API
  const jsonStr = '{"id":"1","name":"Daniel","scores":[80, 75, 100]}';
  const parsedData = safeParse(jsonStr);

  // Renderizar por condicion mediante tsx
  if (isStudent(parsedData)) {
    const avg = average(parsedData.scores);
    return (
      <main className="container">
        <h1>{parsedData.name}</h1>
        <p>Promedio de notas: {avg.toFixed(2)}</p>
      </main>
    );
  }

  return (
    <main className="container">
      <p style={{ color: 'red' }}>Error: El JSON recibido no tiene el formato de Student valido.</p>
    </main>
  );
}