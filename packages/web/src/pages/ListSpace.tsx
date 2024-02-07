import rocketLeftCloud from "../assets/png/rocket-left-cloud.png"

const ListSpace = () => {
  return (
    <>
      <div className="py-4 px-8 mt-0">
        <div
          className=" rounded pb-16 sm:pb-4 p-4 h-[85vh] grid justify-center content-center"
          style={{ backgroundColor: "#F7F7F8" }}
        >
          <div className="grid gap-24 grid-cols-2">
            <div>
              <div>
                <img src={rocketLeftCloud} alt="rocket" className="w-[400px] h-auto" />
              </div>
              <h1>
                Launch your space <br /> <span className="">Enclave awaits!</span>
              </h1>
            </div>
            <div className="p-8 shadow-lg rounded-xl bg-white">
              <h3>Create an account</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListSpace
