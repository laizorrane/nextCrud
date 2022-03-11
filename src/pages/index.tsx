import { useEffect, useState } from "react";
import ClientRepository from "../backend/ClientRepository";
import ClientCollection from "../backend/db/ClientCollection";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";

export default function Home() {

  const repo: ClientRepository = new ClientCollection()

  
  const [client, setClient] = useState<Client>(Client.empty())
  const [clients, setClients] = useState<Client[]>([])
  const [visible, setvisible] = useState< 'table' | 'form'> ('table')

  useEffect(getAll, [])

  function clientSelected(client: Client){
    setClient(client)
    setvisible('form')

  }

  function getAll() {
    repo.getAll().then(clients => {
    setClients(clients)
    setvisible('table')
    })

  }

  async function clientExcluded(client: Client){
    await repo.delete(client)
    getAll()
  }

  async function saveClient(client: Client){
    await repo.save(client)
    getAll()
  }

  function newClient(){
    setClient(Client.empty())
    setvisible('form')
  }
  
  return (
    <div className={`flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white`}>
      <Layout title="Cadastro Simples">
        {visible === 'table' ? (
          <>
          <div className="flex justify-end">
          <Button color="green" className="mb-4" onClick={newClient}>Novo Cliente</Button>
          </div>
          <Table clients={clients} clientSelected={clientSelected} clientExcluded={clientExcluded}></Table>
          </>
        ) : (
          <Form client={client}
          clientChange={saveClient}
          cancel={() => setvisible('table')}></Form>
        )}
       
      </Layout>
    </div>
  )
}
