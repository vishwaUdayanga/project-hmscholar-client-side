import EditMaterialForm from "@/app/ui/lecturer/edit-material";

export default function EditMaterials({params} : {params : {id : string}}) {
    const { id } = params;
    return (
        <div className="p-4">
            <p className="mt-2 p-4 font-semibold">Edit Material</p>
            <EditMaterialForm material_id={id} />
        </div>
    )

}