const ArquivoPlaceHolder = ({aoAlterar}) => {
      return(
            <div>
                  <input type="file" onChange={e => aoAlterar(e.target.files[0])} />
            </div>
      )
}

export default ArquivoPlaceHolder