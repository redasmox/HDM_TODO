import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';


const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [searchName, setSearchName] = useState('');
  const [filterStatus] = useState('');

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleFilter = async () => {
    const params = new URLSearchParams();
    if (searchName) params.append('name', searchName);
    if (filterStatus) params.append('status', filterStatus);
  
    const filteredTasks = await api.get(`/tasks/filter?${params.toString()}`);
    setTasks(filteredTasks);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      await handleFetchTasks();
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  };

  const handleSave = async (id?: number, name?: string) => {
    try {
      if (id) {
        await api.patch(`/tasks/${id}`, { name });
      } else if (newTaskName.trim()) {
        await api.post('/tasks', { name: newTaskName });
        setNewTaskName(''); 
      }
      await handleFetchTasks(); 
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la tâche :', error);
    }
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2}>
  <TextField
    size="small"
    label="Rechercher par nom"
    value={searchName}
    onChange={(e) => setSearchName(e.target.value)}
  />
  
  <Button variant="contained" onClick={handleFilter}>Filtrer</Button>
</Box>
      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box
            key={task.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            gap={1}
            width="100%"
          >
            <TextField
              size="small"
              value={task.name}
              onChange={(e) => {
                const updatedTasks = tasks.map((t) =>
                  t.id === task.id ? { ...t, name: e.target.value } : t
                );
                setTasks(updatedTasks); 
              }}
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton color="success" onClick={() => handleSave(task.id, task.name)}>
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
          <TextField
            size="small"
            placeholder="Nouvelle tâche"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
            sx={{ maxWidth: 350 }}
          />
          <Button variant="outlined" onClick={() => handleSave()}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
