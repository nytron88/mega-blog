import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/appwriteService";
import { RTE, Button, Input, Loader } from "../index";

function PostForm({ post }) {
  const { register, control, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    }
  });

  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    // setLoading(true);
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: currentUserData.$id
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    // setLoading(false);
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-md">
      <Input
        label="Title"
        placeholder="Enter post title"
        className="w-full bg-white focus:bg-white text-black"
        {...register("title", { required: true })}
      />
      <Input
        label="Slug"
        placeholder="post-slug"
        className="w-full bg-white focus:bg-white text-black"
        {...register("slug", { required: true })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
        }}
      />
      <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
      <Input
        label="Featured Image"
        type="file"
        className="w-full bg-white focus:bg-white text-black"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: !post })}
      />
      {post && (
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <select
        className="w-full p-2 border border-gray-300 rounded-md"
        {...register("status", { required: true })}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full">
        {post ? "Update" : "Create"}
      </Button>
    </form>
  );
}

export default PostForm;

