const getURL = year => `https://nolaborables.com.ar/api/v2/feriados/${year}`

const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
const dayOfWeek = (day, month, year) => days[new Date(year, month, day).getDay()]

class NextHoliday extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      loading: true,
      year: (new Date()).getFullYear()
    }
  }
  
  setNext(holidays) {
    const now = new Date()
    const today = {
      day: now.getDate(),
      month: now.getMonth() + 1
    };

    let holiday = holidays.find(h => 
      h.mes === today.month && h.dia > today.day || h.mes > today.month
    );

    if (!holiday){
      holiday = holidays[0];
    }
    
    this.setState({
      loading: false,
      holiday
    })
  }
  
  componentDidMount() {
    axios.get(getURL(this.state.year)).then(({data}) => this.setNext(data))
  }
  
  render() {
    const {loading, holiday, year} = this.state
    return (
      <div className="next-holiday">
        {loading ? <h1 className="loading">Buscando ...</h1>
        : 
          <div className="content">
            <div className="next">Próximo feriado</div>
            <div className="reason">{holiday.motivo}</div>
            <div className="date">
              <div className="weekday">{dayOfWeek(holiday.dia, holiday.mes-1, year)}</div>
              <div className="day">{holiday.dia}</div>
              <div className="month">{months[holiday.mes-1]}</div>
            </div>
            <div className="type">{holiday.tipo}</div>
          </div>
        }
      </div>
    )
  }
}
  
ReactDOM.render(<NextHoliday/>, document.getElementById('mount'));