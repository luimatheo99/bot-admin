import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Spinner } from "../components/Spinner";
import { SpinnerButton } from "../components/SpinnerButton";
import { useAuth } from "../hooks/auth";
import api from "../services/api";

interface ISchedule {
    day: string;
    startTime: string;
    endTime: string;
    active: boolean;
}

interface IPaymentType {
    description: string;
    active: boolean;
}

interface IRestaurant {
    id: string;
    name: string;
    address: string;
    activeOrder: boolean;
    schedules: ISchedule[];
    paymentTypes: IPaymentType[];
}

export function Settings() {
    const { user } = useAuth();
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [restaurant, setRestaurant] = useState<IRestaurant>();
    const [typePayments, setTypePayments] = useState('');

    useEffect(() => {
        setIsLoading(true)
        async function init() {
            const { data } = await api.get(`/restaurants/${user.idRestaurant}`)
            setRestaurant(data)
            if (data?.schedules && data?.schedules.length === 0) {
                setRestaurant({...data, schedules: [
                    {
                        day: 'sun',
                        startTime: '',
                        endTime: '',
                        active: false
                    },
                    {
                        day: 'mon',
                        startTime: '',
                        endTime: '',
                        active: false
                    },
                    {
                        day: 'tue',
                        startTime: '',
                        endTime: '',
                        active: false
                    },
                    {
                        day: 'wed',
                        startTime: '',
                        endTime: '',
                        active: false
                    },
                    {
                        day: 'thu',
                        startTime: '',
                        endTime: '',
                        active: false
                    },
                    {
                        day: 'fri',
                        startTime: '',
                        endTime: '',
                        active: false
                    },
                    {
                        day: 'sat',
                        startTime: '',
                        endTime: '',
                        active: false
                    }
                ]})
            }

            setIsLoading(false)
        }

        init()
    }, [])

    async function handleUpdateConfig(event: FormEvent) {
        try {
            setIsLoadingButton(true)
            event.preventDefault()

            await api.put(`/restaurants/${user.idRestaurant}`, restaurant)

            setIsLoadingButton(false);
            alert('Salvo com sucesso')
        } catch (error) {
            console.error(error)
            alert('Erro ao salvar a categoria')
            setIsLoadingButton(false)
        }
    }

    async function handleAddTypePayments() {
        if (!typePayments) {
            alert('Descrição é obrigatória')
            return
        }
        if (restaurant) {
            let clone = [...restaurant.paymentTypes];
            const data = { description: typePayments, active: true }
            setRestaurant(prevState => {
                if (prevState) {
                    return {
                        ...prevState,
                        paymentTypes: [...clone, data]
                    }
                }
            })
        }
        setTypePayments('')
    }

    async function handleRemoveTypePayment(index: number) {
        if (restaurant) {
            let clone = [...restaurant.paymentTypes];
            clone.splice(index, 1)
            setRestaurant({...restaurant, paymentTypes: clone})
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 m-12">
                {isLoading ? (<Spinner />) : (
                    <>
                        <text className="text-2xl">Configurações</text>
                        <form onSubmit={handleUpdateConfig}>
                            <div className="bg-white border-b border-gray-100 p-6 shadow-sm rounded-md my-2">
                                <div className="grid grid-cols-8 gap-6 my-3">
                                    <div className="col-span-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                                        <input
                                            className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                                            type="text"
                                            value={restaurant?.name}
                                            onChange={
                                                event => {
                                                    if (restaurant) {
                                                        let clone = restaurant;
                                                        let obj = clone;
                                                        obj.name = event.target.value;
                                                        clone.name = obj.name;
                                                        setRestaurant({...clone})
                                                    }
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Endereço</label>
                                        <input
                                            className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                                            type="text"
                                            value={restaurant?.address}
                                            onChange={
                                                event => {
                                                    if (restaurant) {
                                                        let clone = restaurant;
                                                        let obj = clone;
                                                        obj.address = event.target.value;
                                                        clone.address = obj.address;
                                                        setRestaurant({...clone})
                                                    }
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-1 text-center">
                                        <label className="block text-sm font-medium text-gray-900">Ativo</label>
                                        <input
                                            onChange={
                                                () => {
                                                    if (restaurant) {
                                                        let clone = restaurant;
                                                        let obj = clone;
                                                        obj.activeOrder = !restaurant?.activeOrder;
                                                        clone.activeOrder = obj.activeOrder;
                                                        setRestaurant({...clone})
                                                    }
                                                }
                                            }
                                            checked={restaurant?.activeOrder} id="red-checkbox" type="checkbox" value="" className="w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500focus:ring-2"
                                        />
                                        <p />
                                        <small>Quando marcado seus clientes irão conseguir realizar o pedido.</small>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                <div className="border border-gray-200 rounded-md p-4">
                                    <text className="text-xl">Horários</text>
                                    {restaurant?.schedules.map((schedule, index) => (
                                        <div key={index} className="grid gap-3 my-3 lg:grid-cols-10 items-end">
                                            <div className="col-span-5">
                                                <label className="block mb-2 text-sm font-medium text-gray-900">Dia</label>
                                                <select disabled className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500">
                                                    <option>{
                                                        schedule.day === 'sun' ? 
                                                            'Domingo' :
                                                            schedule.day === 'mon' ?
                                                            'Segunda-feira' :
                                                            schedule.day === 'tue' ?
                                                            'Terça-feira' :
                                                            schedule.day === 'wed' ?
                                                            'Quarta-feira' :
                                                            schedule.day === 'thu' ?
                                                            'Quinta-feira' :
                                                            schedule.day === 'fri' ?
                                                            'Sexta-feira' :
                                                            schedule.day === 'sat' ?
                                                            'Sábado' : ''}</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block mb-2 text-sm font-medium text-gray-900">Hora Início</label>
                                                <input
                                                    className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                                                    type="text"
                                                    value={schedule.startTime}
                                                    onChange={
                                                        event => {
                                                            let clone = [...restaurant.schedules];
                                                            let obj = clone[index];
                                                            obj.startTime = event.target.value;
                                                            clone[index].startTime = obj.startTime;
                                                            setRestaurant({...restaurant, schedules: [...clone]})
                                                    }}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block mb-2 text-sm font-medium text-gray-900">Hora Fim</label>
                                                <input
                                                    className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500"
                                                    type="text"
                                                    value={schedule.endTime}
                                                    onChange={
                                                        event => {
                                                            let clone = [...restaurant.schedules];
                                                            let obj = clone[index];
                                                            obj.endTime = event.target.value;
                                                            clone[index].endTime = obj.endTime;
                                                            setRestaurant({...restaurant, schedules: [...clone]})
                                                    }}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label className="block text-sm font-medium text-gray-900">Ativo</label>
                                                <input
                                                    onChange={() => {
                                                        let clone = [...restaurant.schedules];
                                                        let obj = clone[index];
                                                        obj.active = !schedule?.active;
                                                        clone[index].active = obj.active;
                                                        setRestaurant({...restaurant, schedules: [...clone]})
                                                    }}
                                                    checked={schedule?.active} id="red-checkbox" type="checkbox" value="" className="w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500focus:ring-2"/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                    <div className="border border-gray-200 rounded-md p-4">
                                        <text className="text-xl">Tipos de Pagamentos</text>
                                        <div className="grid gap-3 my-3 lg:grid-cols-12 items-end">
                                            <div className="col-span-9">
                                                <label className="block my-2 text-sm font-medium text-gray-900">Descrição</label>
                                                <input
                                                    className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                                                    type="text"
                                                    value={typePayments}
                                                    onChange={
                                                        event => setTypePayments(event.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <button onClick={() => handleAddTypePayments()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-7 py-2.5 ml-0.5">
                                                    Adicionar
                                                </button>
                                            </div>
                                        </div>
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-900 uppercase bg-white border-b border-gray-100">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Descrição
                                                </th>
                                                <th scope="col" className="text-center">Ações</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {restaurant?.paymentTypes.map((paymentType, index) => (
                                                <tr key={index} className="bg-white hover:bg-gray-100 border-b border-gray-100">
                                                    <td className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">
                                                        {paymentType.description}
                                                    </td>
                                                    <td className="text-center">
                                                        <button onClick={() => handleRemoveTypePayment(index)} type="button" className="p-1 text-sm text-gray-500 focus:outline-none rounded-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full text-right">
                                <button disabled={isLoadingButton} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-7 py-2.5 ml-0.5">
                                    {isLoadingButton ? (
                                        <>
                                            <SpinnerButton />
                                            Salvando...
                                        </>
                                    ) : (
                                        'Salvar'
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </main>
        </div>
    );
}